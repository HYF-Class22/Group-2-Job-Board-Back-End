import {
    getById,
    get,
    create,
    update,
    deleteById,
    searchJobs
} from '../models/job.js';

const jobControllers = {
    getAllJobs: async (req, res) => {
        try {
            const data = await get();
            return res.send(data);
        } catch (error) {
            console.error(error);
        }
    },
    getJobById: async (req, res) => {
        try {
            const id = req.params.id;
            const job = await getById(id);
            return res.send(job);
        } catch (error) {
            console.error(error);
        }
    },

        createJob: async (req, res) => {
        try {
            const {
                companyName,
                jobRole,
                salary,
                interviewDate,
                location,
                status,
                notes
            } = req.body;
            console.log(req.body)
            console.log(req.file)
            
            const attachment = req.file ? req.file.filename : null;

            const createNewJob = await create(
                companyName,
                jobRole,
                salary,
                interviewDate,
                location,
                status,
                notes,
                attachment 
            );

                         
            const id = createNewJob.insertId;    
        
            const newJob = await getById(id);
            
            return res.send(newJob);
        } catch (error) {
            console.error(error);
        }
    },

    updateJobById: async (req, res) => {
        try {
            const id = req.params.id;
            const { companyName, jobRole, interviewDate, salary } = req.body;
            // Validation
            if ((!companyName, !jobRole, !interviewDate, !salary)) {
                console.log('companyName, jobRole, salary is required');
                return;
            }
            await update(id, companyName, interviewDate, jobRole, salary);
            const job = await getById(id);
            return res.send(job);
        } catch (error) {
            console.error(error);
        }
    },
    deleteJobById: async (req, res) => {
        try {
            const id = req.params.id;
            await deleteById(id);
            return res.send({ message: 'Job deleted successfully' });
        } catch (error) {
            console.error(error);
        }
    },
    searchJobs: async (req, res) => {
        try {
            const query = req.query.query.toLowerCase();
            const filteredJobs = await searchJobs(query);
            return res.send(filteredJobs);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
};

export default jobControllers;
