# -*- coding: utf-8 -*-
import time
from application import app


class UrlManager(object):
    def __init__(self):
        pass

    @staticmethod
    def buildUrl( path ):
        return path

    @staticmethod
    def buildStaticUrl(path):
        release_version = app.config.get('RELEASE_VERSION')
        # 通过时间戳来解决js文件加载缓存的问题
        ver = "%s"%( str(time.time()) ) if not release_version else release_version
        path =  "/static" + path + "?ver=" + ver
        return UrlManager.buildUrl( path )