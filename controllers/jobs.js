const getAllJobs = async (req, res) => {
  res.send(`get all jobs`);
};

const getJob = async (req, res) => {
  res.send(`get a jobs`);
};

const createJob = async (req, res) => {
  res.json(req.user);
};

const updateJob = async (req, res) => {
  res.send(`Update jobs`);
};

const deleteJob = async (req, res) => {
  res.send(`Delete jobs`);
};

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob };
