import base64
import os
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google.auth.exceptions import RefreshError
from googleapiclient.errors import HttpError
import sys

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def send_notification():
    try:
        print("inside python code")
        creds = None
        # The file token.json stores the user's access and refresh tokens and is
        # created automatically when the authorization flow completes for the first time.
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json')
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                try:
                    creds.refresh(Request())
                except RefreshError as e:
                    print(f"Error refreshing credentials: {e}")
            else:
                flow = InstalledAppFlow.from_client_secrets_file('config/credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        service = build('gmail', 'v1', credentials=creds)

        subject = sys.argv[1]
        to_address = sys.argv[2]
        message = sys.argv[3]

        print(subject, to_address, message)

        # Set the recipient in the 'To' field of the raw message
        create_message = {
            'raw': base64.urlsafe_b64encode(
                f'To: {to_address}\nSubject: {subject}\n\nThis is the body of the email'.encode()
            ).decode()
        }


        try:
            sent_message = service.users().messages().send(userId="me", body=create_message).execute()
            print(f'Sent message to {to_address} Message Id: {sent_message["id"]}')
        except HttpError as error:
            print(f'An error occurred: {error}')
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

send_notification()