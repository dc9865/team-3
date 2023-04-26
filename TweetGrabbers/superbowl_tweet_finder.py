from datetime import datetime
import requests
from time import sleep

# the token for my specific Twitter dev account
BEARER_TOKEN = ':3'

def get_tweets():
    params = {'query': '#superbowl',
            'start_time': '2023-02-12T18:30:00.52-05:00', # Convert to EST (UTC - 5), Superbowl starts 6:30 PM EST
            #'start_time': '2023-02-12T13:20:00.52-05:00',
            'tweet.fields': 'text,created_at',
            'max_results': '100'}
    headers = {'Authorization': 'Bearer ' + BEARER_TOKEN}
    r = requests.get('https://api.twitter.com/2/tweets/search/recent', params=params, headers=headers)

    # save the contents of the superbowl_tweets.txt
    with open("superbowl_tweets.txt", "r") as file:
        save = file.read()

    # save the latest tweet to compare to the new data to avoid repeats
    latest_tweet = ""
    if(len(save) > 0):
        latest_tweet = save[: save.index(',')]

    # overrite superbowl_tweets.txt with the new data
    tweets = r.json()
    with open("superbowl_tweets.txt", "w") as file:
        for tweet in tweets['data']:
            # if this tweet is the same as the latest previous tweet, stop writing
            #print(latest_tweet + " | " + tweet['id'].strip())
            if latest_tweet == tweet['id']:
                break
            file.write(tweet['id'] + ',' + tweet['created_at'] + ',' + tweet['text'].replace('\n', ' // ') + "\n")

    # append the save of the old file after the new data
    with open("superbowl_tweets.txt", "a") as file:
        file.write(save)

def get_tweets_every_minute():
    while datetime.now().second not in {0}:  # Wait 1 second until we are synced up with the 'every minute' clock
        sleep(1)
        print(datetime.now())
    
    get_tweets()

    sleep(5) # sleep for five seconds so it doesn't continuously call get_tweets() for a minute

while True:
    get_tweets_every_minute()