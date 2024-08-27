import os
from supabase import create_client, Client

from conf.settings import service_settings

supabase: Client = create_client(service_settings.SUPABASE_URL, service_settings.SUPABASE_KEY)