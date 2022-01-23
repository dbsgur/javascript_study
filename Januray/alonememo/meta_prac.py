import requests
from bs4 import BeautifulSoup

url = 'https://platum.kr/archives/120958'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get(url, headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

og_image = soup.select_one('meta[property="og:image"]')
og_title = soup.select_one('meta[property="og:title"]')
og_descriptions = soup.select('meta[property="og:description"]')

# print("og_image : ", og_image)
# print("og_title : ", og_title)
# print("og_description : ", og_descriptions)


for og_description in og_descriptions:
    url_description = og_description['content']
    if url_description != "" :
        break
# url_image = og_image['content']
# url_title = og_title['content']
# url_decription = og_descriptions['content']

# print("url_image : ", url_image)
# print("url_title : ", url_title)
# print("url_decription : ", url_decription)

