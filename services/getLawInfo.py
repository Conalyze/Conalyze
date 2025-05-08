import requests
import xml.etree.ElementTree as ET
import json

API_KEY = 'YOUR_API_KEY_HERE'


# 법령명에 따른 ID 찾아주는 함수
def search_law_id(law_name):
    url = f'https://www.law.go.kr/DRF/lawSearch.do?OC={API_KEY}&target=law&query={law_name}'
    response = requests.get(url)
    if response.status_code != 200:
        return None

    try:
        root = ET.fromstring(response.text)
        law_id = root.find('.//lawId')
        return law_id.text if law_id is not None else None
    except ET.ParseError:
        return None


# ID와 getAdvice에서 받은 조항 번호를 통해 원문 텍스트 긁어오는 함수
def get_article_json(law_id, article_number):
    url = f'https://www.law.go.kr/DRF/lawService.do?OC={API_KEY}&target=law&ID={law_id}'
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": "API 요청 실패"}

    try:
        root = ET.fromstring(response.text)
        articles = root.findall('.//article')
        for article in articles:
            no = article.find('ArticleNo')
            content = article.find('ArticleContent')
            if no is not None and no.text == article_number:
                return {
                    "조항번호": article_number,
                    "내용": content.text.strip() if content is not None else "내용 없음"
                }
        return {"error": f"제{article_number}조를 찾을 수 없습니다."}
    except ET.ParseError:
        return {"error": "XML 파싱 실패"}


# 결과 json으로 반환하는 함수
def get_all_law_details_as_json(data):
    results = []
    for law_info in data.get("관련법조항", []):
        law_name = law_info.get("법령명")
        article = law_info.get("조항", "").replace("조", "")
        law_id = search_law_id(law_name)
        if law_id:
            article_json = get_article_json(law_id, article)
            results.append({
                "법령명": law_name,
                "조항": f"{article}조",
                "조문내용": article_json.get("내용", "없음")
            })
        else:
            results.append({
                "법령명": law_name,
                "조항": f"{article}조",
                "조문내용": "법령 ID를 찾을 수 없습니다"
            })
    return json.dumps(results, ensure_ascii=False, indent=2)


def get_all_law_details_as_json1(data):
    result = {
        "law": {
            "lawName": "근로기준법",
            "lawNo": "제17조",
            "enforcementDate": "2021-01-05",
            "promulgationNo": "제17791호",
            "article": {
                "articleNo": "제17조",
                "articleTitle": "근로조건의 명시",
                "paragraphs": [
                    {
                        "paragraphNo": "①",
                        "content": "사용자는 근로계약을 체결할 때에 근로자에게 다음 각 호의 사항을 명시하여야 한다. 근로계약 체결 후 다음 각 호의 사항을 변경하는 경우에도 또한 같다.",
                        "items": [
                            {"itemNo": "1", "content": "임금"},
                            {"itemNo": "2", "content": "소정근로시간"},
                            {"itemNo": "3", "content": "제55조에 따른 휴일"},
                            {"itemNo": "4", "content": "제60조에 따른 연차 유급휴가"},
                            {"itemNo": "5", "content": "그 밖에 대통령령으로 정하는 근로조건"}
                        ]
                    },
                    {
                        "paragraphNo": "②",
                        "content": "사용자는 제1항제1호와 관련한 임금의 구성항목ㆍ계산방법ㆍ지급방법 및 제2호부터 제4호까지의 사항이 명시된 서면(「전자문서 및 전자거래 기본법」 제2조제1호에 따른 전자문서를 포함한다)을 근로자에게 교부하여야 한다. 다만, 본문에 따른 사항이 단체협약 또는 취업규칙의 변경 등 대통령령으로 정하는 사유로 인하여 변경되는 경우에는 근로자의 요구가 있으면 그 근로자에게 교부하여야 한다."
                    }
                ]
            }
        }
    }
    return result


##########################
# 다른 파일에서의 사용 예시 #
##########################
# getAdvice 사용까지 포함

'''
from services.getAdvice import get_analysis_with_law_matching
from services.getLawInfo import get_all_law_details_as_json
import os
import pprint
import json

# 상대 경로를 기준으로 경로 지정
contract_file_path = os.path.join("uploads", "img.png_ocr.txt")  # 상대경로
csv_folder_path = os.path.join("fineTuningFiles")  # 상대경로

result = get_analysis_with_law_matching(
    contract_file_path = os.path.join("uploads", "img.png_ocr.txt"),  # 상대경로
    csv_folder_path = os.path.join("fineTuningFiles")  # 상대경로
)

# 결과 출력

pprint.pprint(result)

# 관련법조항 상세 내용을 국가법령정보 API로 보완
law_details_json = get_all_law_details_as_json(result)

# 결과 출력
print("=== 분석 결과 요약 ===")
print(json.dumps(result, indent=2, ensure_ascii=False))

print("\n=== 관련 법령 상세 내용 ===")
print(law_details_json)
'''
