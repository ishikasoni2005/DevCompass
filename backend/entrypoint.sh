#!/bin/sh
set -e

python manage.py migrate --noinput
python manage.py collectstatic --noinput

if [ "${SEED_DEMO_DATA}" = "True" ] || [ "${SEED_DEMO_DATA}" = "true" ]; then
  python manage.py seed_devcompass
fi

exec gunicorn devcompass.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120
