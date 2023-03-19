#!/usr/bin/env python3
""" Defines index_range and Server class"""
import csv
import math
from typing import Dict, List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Returns a tuple of a start and an end index"""
    start_idx = (page * page_size) - page_size
    end_idx = start_idx + page_size
    return (start_idx, end_idx)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Returns the right list of rows """
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        start_idx, end_idx = index_range(page, page_size)
        idx_range = self.dataset()
        if start_idx > len(idx_range):
            return []
        return idx_range[start_idx:end_idx]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """ Returns a dictionary"""
        start_idx, end_idx = index_range(page, page_size)
        data = self.get_page(page, page_size)
        page_size = len(data)
        if end_idx < len(self.__dataset):
            next_page = page + 1
        else:
            next_page = None
        if start_idx > 0:
            prev_page = page - 1
        else:
            prev_page = None

        total_pages = math.ceil(len(self.__dataset) / page_size)
        res_data = {
                'page_size': page_size,
                'page': page,
                'data': data,
                'next_page': next_page,
                'prev_page': prev_page,
                'total_pages': total_pages
                }
        return res_data
