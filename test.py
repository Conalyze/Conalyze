from services.getAdvice import get_analysis_with_law_matching, get_final_contract_analysis, get_openai_response
from services.getLawInfo import get_all_law_details_as_json, get_all_law_details_as_json1
import os
import pprint
import json

# 상대 경로를 기준으로 경로 지정
contract_file_path = os.path.join("uploads", "img.png_ocr.txt")  # 상대경로
csv_folder_path = os.path.join("fineTuningFiles")  # 상대경로

# 1차 계약서 분석: CSV 파일 참고된 결과 + 법령api를 사용해서 얻은 결과
result = get_analysis_with_law_matching(contract_file_path, csv_folder_path)

# 법령 API를 사용해서 얻은 결과
law_details_json = get_all_law_details_as_json1(result)

# 최종. csv 참고한 1차 계약서 분석 결과 + 법령 API를 사용해서 얻은 결과
final_result = get_openai_response(result, law_details_json, csv_folder_path)

print(json.dumps(final_result, indent=2, ensure_ascii=False))