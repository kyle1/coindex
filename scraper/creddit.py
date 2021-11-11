#auth reference: https://towardsdatascience.com/how-to-use-the-reddit-api-in-python-5e05ddfd1e5c
import psycopg2
import requests
from config import *
from datetime import datetime
from time import sleep

BASE_URL = "https://www.reddit.com/"

auth = requests.auth.HTTPBasicAuth(reddit_app_id, reddit_secret)
data = {'grant_type': 'password',
        'username': reddit_username,
        'password': reddit_password}
headers = {'User-Agent': 'cryptop/1.0.0'}
response = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=headers)
token = response.json()['access_token']
headers = {**headers, **{'Authorization': f"bearer {token}"}}

sleep(3)

conn = psycopg2.connect("dbname=crypto user=postgres password=postgres")

cur = conn.cursor()
sql = "SELECT * FROM crypto;"
cur.execute(sql)

dt = datetime.now()
print(cur)
for crypto in cur:
    try:
        crypto_id = crypto[0]
        sub = crypto[3]
        if sub != "r/loopringorg": #for testing
            continue
        url = "https://oauth.reddit.com/" + sub + "/top.json"
        print(url)
        response = requests.get(url, headers=headers).json()
        print(response)
        sleep(5)
        top_posts = response['data']['children']
        sub_count = None
        if len(top_posts) > 0:
            sub_count = top_posts[0]['data']['subreddit_subscribers']
            sql = f"INSERT INTO subreddit_stats (crypto_id, subscribers, stats_datetime) VALUES ({crypto_id}, {sub_count}, '{dt}')"
            other_cur = conn.cursor()
            other_cur.execute(sql)
            conn.commit()
    except Exception as e:
        print(e)
print("end loop")


