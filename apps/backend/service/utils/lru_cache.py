from collections import OrderedDict
from typing import Tuple, Any

class CustomLRUCache:
    def __init__(self, maxsize: int = 128):
        self.maxsize = maxsize
        self.cache: OrderedDict = OrderedDict()
    
    def get(self, key: Tuple) -> Any:
        if key not in self.cache:
            return None
        # Move to end to show recently used
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key: Tuple, value: Any) -> None:
        if key in self.cache:
            # Move to end to show recently used
            self.cache.move_to_end(key)
        else:
            if len(self.cache) >= self.maxsize:
                # Remove least recently used
                self.cache.popitem(last=False)
        self.cache[key] = value