import sentry_sdk

sentry_sdk.init(
    dsn="https://3d9ac063c142b3d3d36ab56c4013426c@o4506868248018944.ingest.us.sentry.io/4507180484984832",
    traces_sample_rate=1.0,
    send_default_pii=True,
)
try:
    1 / 0
except ZeroDivisionError as e:
    sentry_sdk.capture_exception(e)
