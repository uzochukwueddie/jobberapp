import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { elasticSearchClient } from '@gig/elasticsearch';
import { IHitsTotal, IPaginateProps, IQueryList, ISearchResult } from '@uzochukwueddie/jobber-shared';

const gigsSearchBySellerId = async (searchQuery: string, active: boolean): Promise<ISearchResult> => {
  const queryList: IQueryList[] = [
    {
      query_string: {
        fields: ['sellerId'],
        query: `*${searchQuery}*`
      }
    },
    {
      term: {
        active
      }
    }
  ];
  const result: SearchResponse = await elasticSearchClient.search({
    index: 'gigs',
    query: {
      bool: {
        must: [...queryList]
      }
    }
  });
  const total: IHitsTotal = result.hits.total as IHitsTotal;
  return {
    total: total.value,
    hits: result.hits.hits
  };
};

const gigsSearch = async (
  searchQuery: string,
  paginate: IPaginateProps,
  deliveryTime?: string,
  min?: number,
  max?: number
): Promise<ISearchResult> => {
  const { from, size, type } = paginate;
  const queryList: IQueryList[] = [
    {
      query_string: {
        fields: ['username', 'title', 'description', 'basicDescription', 'basicTitle', 'categories', 'subCategories', 'tags'],
        query: `*${searchQuery}*`
      }
    },
    {
      term: {
        active: true
      }
    }
  ];

  if (deliveryTime !== 'undefined') {
    queryList.push({
      query_string: {
        fields: ['expectedDelivery'],
        query: `*${deliveryTime}*`
      }
    });
  }

  if (!isNaN(parseInt(`${min}`)) && !isNaN(parseInt(`${max}`))) {
    queryList.push({
      range: {
        price: {
          gte: min,
          lte: max
        }
      }
    });
  }
  const result: SearchResponse = await elasticSearchClient.search({
    index: 'gigs',
    size,
    query: {
      bool: {
        must: [...queryList]
      }
    },
    sort: [
      {
        sortId: type === 'forward' ? 'asc' : 'desc'
      }
    ],
    ...(from !== '0' && { search_after: [from] })
  });
  const total: IHitsTotal = result.hits.total as IHitsTotal;
  return {
    total: total.value,
    hits: result.hits.hits
  };
};

const gigsSearchByCategory = async (searchQuery: string): Promise<ISearchResult> => {
  const result: SearchResponse = await elasticSearchClient.search({
    index: 'gigs',
    size: 10,
    query: {
      bool: {
        must: [
          {
            query_string: {
              fields: ['categories'],
              query: `*${searchQuery}*`
            }
          },
          {
            term: {
              active: true
            }
          }
        ]
      }
    },
  });
  const total: IHitsTotal = result.hits.total as IHitsTotal;
  return {
    total: total.value,
    hits: result.hits.hits
  };
};

const getMoreGigsLikeThis = async (gigId: string): Promise<ISearchResult> => {
  const result: SearchResponse = await elasticSearchClient.search({
    index: 'gigs',
    size: 5,
    query: {
      more_like_this: {
        fields: ['username', 'title', 'description', 'basicDescription', 'basicTitle', 'categories', 'subCategories', 'tags'],
        like: [
          {
            _index: 'gigs',
            _id: gigId
          }
        ]
      }
    }
  });
  const total: IHitsTotal = result.hits.total as IHitsTotal;
  return {
    total: total.value,
    hits: result.hits.hits
  };
};

const getTopRatedGigsByCategory = async (searchQuery: string): Promise<ISearchResult> => {
  const result: SearchResponse = await elasticSearchClient.search({
    index: 'gigs',
    size: 10,
    query: {
      bool: {
        filter: {
          script: {
            script: {
              source: 'doc[\'ratingSum\'].value != 0 && (doc[\'ratingSum\'].value / doc[\'ratingsCount\'].value == params[\'threshold\'])',
              lang: 'painless',
              params: {
                threshold: 5
              }
            }
          }
        },
        must: [
          {
            query_string: {
              fields: ['categories'],
              query: `*${searchQuery}*`
            }
          }
        ]
      }
    }
  });
  const total: IHitsTotal = result.hits.total as IHitsTotal;
  return {
    total: total.value,
    hits: result.hits.hits
  };
};

export {
  gigsSearchBySellerId,
  gigsSearch,
  gigsSearchByCategory,
  getMoreGigsLikeThis,
  getTopRatedGigsByCategory
};
