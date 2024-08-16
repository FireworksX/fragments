# pylint: disable=C0413

from services.api import Api

api: Api = Api()

# Import routes here
# from .module import *  # isort:skip

from .health import * # isort:skip
from .user import *
from .auth import *
from .fragments import *
