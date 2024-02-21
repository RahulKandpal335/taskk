const Course = require('../Model/Course');

exports.coursePagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        console.log("page" , page);
        const limit = 10; 
        const skip = (page - 1) * limit; 

        const courses = await Course.find().skip(skip).limit(limit);
        console.log("Courses" , courses);

        const totalCourses = await Course.countDocuments();
        console.log("totalC" , totalCourses);

        const totalPages = Math.ceil(totalCourses / limit);
        console.log("totalPage" ,totalPages);

        const baseUrl = req.protocol + '://' + req.get('host') + req.baseUrl;

        console.log("baseurl" ,baseUrl);

        let prevPageUrl = null;
        let nextPageUrl = null;

        if (page > 1) {
            prevPageUrl = `${baseUrl}/getCourse/?page=${page - 1}`;
        }
        if (page < totalPages) {
            nextPageUrl = `${baseUrl}/getCourse/?page=${page + 1}`;
        }

        return res.status(200).json({
            status: true,
            data: courses,
            pagination: {
                totalCourses,
                totalPages,
                currentPage: page,
                prevPageUrl,
                nextPageUrl
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

exports.createCourse = async(req , res)=>{
    try{

        const {title} = req.body;
        console.log("title" , title);

        if(!title){
            return res.status(403).json({
                status:false ,
                message:"Please send the title"
            })
        }

         const courseDetail = await Course.create({title:title});

             return res.status(200).json({
                status:true ,
                courseDetail
             })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: false , 
            message:"intenal server error "
        })
    }
}

