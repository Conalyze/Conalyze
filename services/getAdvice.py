import openai
import os
import csv
import json
import re
from dotenv import load_dotenv

# .env 파일에서 API 키 불러오기
load_dotenv()
openai.api_key = os.getenv('OPENAI_KEY')


### --- CSV 관련 함수들 --- ###

def load_csv_data_by_name(filename, folder_path):
    file_path = os.path.join(folder_path, filename)
    try:
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            return list(csv.DictReader(f))
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='cp949') as f:
            return list(csv.DictReader(f))


def extract_law_info_from_text(text):
    # 예: "근로기준법 제50조", "가사근로자법 제28조"
    match = re.match(r"(.+?)\s*제\s*(\d+[조항]*)", text)
    if match:
        return match.group(1).strip(), match.group(2).strip()
    return None, None


def match_laws_with_csv(gpt_law_list, law_content_csv, law_meta_csv):
    matched_laws = []

    for entry in gpt_law_list:
        law_name, article = extract_law_info_from_text(entry)
        if not law_name or not article:
            continue

        # 1. 조문 내용 찾기
        matched_content = next(
            (row for row in law_content_csv
             if law_name.replace(" ", "") in row.get("법령명", "").replace(" ", "")
             and article in row.get("조문명", "")),
            None
        )

        # 2. 메타 정보 찾기
        matched_meta = next(
            (row for row in law_meta_csv
             if law_name.replace(" ", "") in row.get("법령명", "").replace(" ", "")),
            None
        )

        matched_laws.append({
            "법령명": matched_meta.get("법령명") if matched_meta else law_name,
            "조항": article,
            "공포번호": matched_meta.get("공포번호", "미확인") if matched_meta else "미확인",
            "시행일자": matched_meta.get("시행일자", "미확인") if matched_meta else "미확인",
            "법령내용": matched_content.get("조문명", "해당 조문을 찾을 수 없습니다.") if matched_content else "해당 조문을 찾을 수 없습니다."
        })

    return matched_laws


### --- GPT 계약서 분석 --- ###

def analyze_contract(contract_text):
    prompt = f"""
    이 계약서 내용을 아래 항목에 따라 분석해 주세요:

    1. **계약서 필수 기재사항 누락 여부 확인**
    2. **대한민국 근로기준법 및 관련 법령 위반 여부 판단**
    3. **위반이 있다면 구체적인 위반 내용과 해당 법령 조항 명시**
    4. **임금 구조의 적절성 판단**
    5. **사회보험 적용 여부의 적절성**
    6. **기타 유의사항 및 계약서에서 잘못 해석될 수 있는 부분 설명**
    7. **근로자에게 불리하게 작용할 수 있는 조항이 있는 경우 설명**
    8. **총평 및 권고사항**

    출력 형식은 아래 JSON만 사용하세요. 다른 텍스트는 포함하지 마세요.

    ```json
    {{
      "필수사항누락": ["항목1", "항목2", ...],
      "위반여부": "예" 또는 "아니오",
      "위반세부사항": ["설명1", "설명2", ...],
      "관련법조항": ["근로기준법 제00조", "최저임금법 제0조", ...],
      "법령내용": ["조항 내용1", "조항 내용2", ...],
      "임금구조평가": "간단 요약 또는 문제점",
      "사회보험평가": "간단 요약 또는 문제점",
      "기타유의사항": ["설명1", "설명2", ...],
      "총평": "전반적인 평가와 권고사항"
    }}
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "당신은 대한민국 노동법 전문가입니다."},
            {"role": "user", "content": "아래는 한 근로계약서입니다. 내용을 분석해 주세요."},
            {"role": "user", "content": contract_text},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1500,
        temperature=0
    )

    try:
        result_text = response['choices'][0]['message']['content'].strip()

        if result_text.startswith("```json"):
            result_text = re.sub(r"```json\s*|\s*```", "", result_text, flags=re.DOTALL).strip()

        return json.loads(result_text)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON from GPT", "raw_output": result_text}


### --- 전체 흐름을 실행하는 함수 --- ###

def get_analysis_with_law_matching(contract_file_path, csv_folder_path):
    # 1. 계약서 불러오기
    with open(contract_file_path, 'r', encoding='utf-8') as file:
        contract_text = file.read()

    # 2. GPT 분석 실행
    gpt_result = analyze_contract(contract_text)

    # 3. GPT가 추정한 법령조항 리스트
    gpt_laws = gpt_result.get("관련법조항", [])

    # 4. CSV 각각 로드
    law_content_csv = load_csv_data_by_name("고용노동부_고용노동관련 법령 내용_20250227.csv", csv_folder_path)
    law_meta_csv = load_csv_data_by_name("고용노동부_고용노동관련 법령_20250227.csv", csv_folder_path)

    # 5. GPT 결과를 CSV 기준으로 보정
    matched_laws = match_laws_with_csv(gpt_laws, law_content_csv, law_meta_csv)

    # 6. 결과 JSON에 반영
    gpt_result["관련법조항"] = matched_laws

    return gpt_result


##########################
# 다른 파일에서의 사용 예시 #
##########################
'''
from services.getAdvice import get_analysis_with_law_matching
import os
import pprint

# 상대 경로를 기준으로 경로 지정
contract_file_path = os.path.join("uploads", "img.png_ocr.txt")  # 상대경로
csv_folder_path = os.path.join("fineTuningFiles")  # 상대경로

result = get_analysis_with_law_matching(
    contract_file_path = os.path.join("uploads", "img.png_ocr.txt"),  # 상대경로
    csv_folder_path = os.path.join("fineTuningFiles")  # 상대경로
)

# 결과 출력

pprint.pprint(result)
'''
