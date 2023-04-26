# import required libraries
from datetime import datetime, timezone, timedelta
import http.client
import json
import urllib.parse
from time import sleep

# the token for my specific Twitter dev account
BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAKzrlgEAAAAAht6dzPN67U8IuexfSMWN279WB4c%3DyYf2sq8wgmczA0jFyhL14x5zk2QEvDpkietkahQDoiHQuAks7V'

def get_tweets(event):
    # get current date and time in UTC
    now = datetime.now(timezone.utc)
    tweets = []  # store tweets
    seen_tweets = set()  # store unique tweet IDs
    # get tweets every minute for 5 minutes
    for i in range(5):
        
        # subtract 60 seconds from current time
        start_time = now - timedelta(seconds=60)

        # format date and time as RFC3339 string
        start_time_str = start_time.astimezone().replace(microsecond=0).isoformat()
        params = {'query': '#' + event,
                  'start_time': start_time_str,
                  'tweet.fields': 'text,created_at',
                  'max_results': 100}
        headers = {'Authorization': 'Bearer ' + BEARER_TOKEN}

        # send request to Twitter API
        conn = http.client.HTTPSConnection("api.twitter.com")
        query_string = urllib.parse.urlencode(params)
        conn.request("GET", "/2/tweets/search/recent?" + query_string, headers=headers)
        response = conn.getresponse()
        data = response.read().decode('utf-8')
        tweets_data = json.loads(data)

        # add new unique tweets to tweets list
        if 'data' in tweets_data.keys():
            for tweet in tweets_data['data']:
                tweet_id = tweet['id']
                if tweet_id not in seen_tweets:
                    seen_tweets.add(tweet_id)
                    tweets.append(tweet)
        # wait 5 secs
        sleep(1)

    return tweets

def main():
    while True:
        while datetime.now().second != 0:  # Wait 1 second until we are synced up with the 'every minute' clock
            print(datetime.now())
            sleep(1)

        print(datetime.now())

        tweets = get_tweets('coachella')
        with open("coachella_tweets.txt", "a", encoding="utf-8") as file:
            file.write(str(tweets))
        
        print(len(tweets))

        sleep(5) # sleep for five seconds so it doesn't constantly call

main()