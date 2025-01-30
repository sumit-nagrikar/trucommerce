const paginate = (schema) => {
  /**
   * Paginate query results
   * @param {Object} filter - MongoDB filter object
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sorting format: field:(asc|desc), e.g., "name:asc,price:desc"
   * @param {string} [options.populate] - Fields to populate, separated by commas
   * @param {number} [options.limit=10] - Items per page
   * @param {number} [options.page=1] - Page number
   * @returns {Promise<{results: Document[], page: number, limit: number, totalPages: number, totalResults: number}>}
   */
  schema.statics.paginate = async function (filter = {}, options = {}) {
    const sort =
      options.sortBy
        ?.split(',')
        .map((s) => {
          const [key, order] = s.split(':');
          return `${order === 'desc' ? '-' : ''}${key}`;
        })
        .join(' ') || 'createdAt';

    const maxLimit = 100; // Prevents fetching too many documents at once
    const limit = Math.min(
      Math.max(parseInt(options.limit, 10) || 10, 1),
      maxLimit
    );
    const page = Math.max(parseInt(options.page, 10) || 1, 1);
    const skip = (page - 1) * limit;

    const [totalResults, results] = await Promise.all([
      this.countDocuments(filter),
      this.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(options.populate || ''),
    ]);

    return {
      results,
      page,
      limit,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
    };
  };
};

export { paginate };
