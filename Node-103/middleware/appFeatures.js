

const appFeatures = (model, populate)=> async(req, res, next)=>{
    let query;
    let reqQuery = { ...req.query}

    // field excluded
    const removeFields = ['select', 'sort', 'page', 'limit']

    // functionality to remove fields from query
    removeFields.forEach(item => delete reqQuery[item])

    
    // stringify query for replace method 
let queryString = JSON.stringify(reqQuery)

queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match =>`$${match}`)

// query search
query = model.find(JSON.parse(queryString))

// Select functionality
if(req.query.select){
  const fields = req.query.select.split(',').join(' ')
 query = query.select(fields)
}
// sorting
if(req.query.sort){
  const sortBy = req.query.sort.split(',').join(' ')
 query = query.sort(sortBy)
}else{
  query = query.sort('-createdAt')
}
// pagination

const page = parseInt(req.query.page, 10) || 1
const limit = parseInt(req.query.limit, 10) || 10

const startIndex = (page - 1)* limit
const endIndex = page * limit

const total = await model.countDocuments()



query = query.skip(startIndex).limit(limit)

if(populate){
    query = query.populate(populate)
}

  const result = await query

  const paginate = {}

  if(endIndex < total){
    paginate.next = {
      page:page +1,
      limit

    }
  }
  if(startIndex > 0){
    paginate.prev = {
      page: page - 1,
      limit
    }
  }

  res.advanceResult = {
    status:"success",
    count: result.length,
    data: result
  }
  next()
}

module.exports = appFeatures