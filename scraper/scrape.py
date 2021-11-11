#PRAW docs
#https://praw.readthedocs.io/en/stable/

import praw
from praw.models import MoreComments
from config import *

reddit = praw.Reddit(
    client_id=reddit_app_id,
    client_secret=reddit_secret,
    user_agent='cryptop',
    username=reddit_username,
    password=reddit_password)

subreddit = reddit.subreddit('cryptocurrency')

submissions = subreddit.top(limit=1)

# for submission in submissions:
#     print(submission.id)
#     print(submission.title)
    
#     for comment in submission.comments:
#         # https://praw.readthedocs.io/en/stable/tutorials/comments.html
#         # To skip non-toplevel comments:
#         # if isinstance(comment, MoreComments):
#         #     continue
#         print(comment.body)
#         print("\n")

#     print("\n")

for submission in submissions:
    print(submission.id)
    print(submission.title)
    
    submission.comments.replace_more(limit=None)
    for comment in submission.comments.list():
        print(comment.body)
        print("\n")

    print("\n")