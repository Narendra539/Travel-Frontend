export const getImageUrl = (path) => {
    return "http://ec2-3-17-70-175.us-east-2.compute.amazonaws.com/travel-frontend/"+path
}

export const getPlanUrl = (id) => {
    return "/travel-frontend/plans/"+id
}

export const getPlanEditUrl = (id) => {
    return "/travel-frontend/editplan/"+id
}