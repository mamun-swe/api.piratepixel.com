
// Pagination query
const PaginateQueryParams = data => {
    let limit = 10
    let page = 1

    if (data.page) page = parseInt(data.page)
    if (data.page && parseInt(data.page) <= 0) page = 1

    if (data.limit) limit = parseInt(data.limit)
    if (data.limit && parseInt(data.limit) < 10) limit = 10

    return { limit, page }
}

// Next page
const NextPage = (page, totalPage) => {
    if (page && page >= totalPage) {
        return null
    }
    return page + 1
}

// Prev page
const PrevPage = (page) => {
    if (page && page === 1) {
        return null
    }
    return page - 1
}

// Pagination
const Paginate = (data) => {
    const page = parseInt(data.page)
    const limit = parseInt(data.limit)
    const totalItems = parseInt(data.totalItems)

    if (!totalItems) return null

    const pageTotal = Math.ceil(totalItems / limit)
    return {
        items: totalItems,
        limit: limit,
        page: page,
        totalPage: pageTotal,
        prev: PrevPage(page),
        next: NextPage(page, pageTotal)
    }
}


module.exports = {
    PaginateQueryParams,
    Paginate
}