#!/usr/bin/env python3
""" Defines index_range"""


def index_range(page: int, page_size: int) -> tuple:
    """ Returns a tuple of a start and an end index"""
    start_idx = (page * page_size) - page_size
    end_idx = start_idx + page_size
    return (start_idx, end_idx)
