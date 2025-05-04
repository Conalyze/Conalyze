from services.getAdvice import get_analysis_with_law_matching, get_final_contract_analysis
from services.getLawInfo import get_all_law_details_as_json, get_all_law_details_as_json1
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
law_details_json = get_all_law_details_as_json1(result)

# 결과 출력
print("=== 분석 결과 요약 ===")
print(json.dumps(result, indent=2, ensure_ascii=False))

print("\n=== 관련 법령 상세 내용 ===")
print(law_details_json)

print("\n=== 최종 결과물 ===")
final_result = get_final_contract_analysis(result, law_details_json)
print(final_result)