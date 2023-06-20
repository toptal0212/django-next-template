from django.core.mail.backends.smtp import *
from django.db import transaction

from .models import *

class LoggingEmailBackend(EmailBackend):
    """
    A wrapper around the SMTP backend that logs all emails to the DB.
    """
    def send_messages(self, email_messages):
        """
        A helper method that does the actual logging
        """
        with transaction.atomic():

            for email_message in email_messages:

                email_record = Email.objects.create(
                    to='; '.join(email_message.recipients()),
                    subject=email_message.subject, body=email_message.body,
                )

                try:
                    return super(LoggingEmailBackend, self)._send(
                        email_message
                    )
                except:
                    email_record.ok = False
                    return False
                finally:
                    email_record.ok = True
                    return True