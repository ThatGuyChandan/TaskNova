import Project from '../models/ProjectModel.js';
import { superuserState } from '../config/superuser.js';
export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.create({ name, description, user: req.user._id, members: [req.user._id] });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};
export const getProjects = async (req, res) => {
    try {
        let projectsQuery = Project.find();
        if (superuserState.view) {
            projectsQuery = projectsQuery.populate('user', 'email');
        }
        const projects = await projectsQuery;
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting projects', error });
    }
};
export const getProjectById = async (req, res) => {
    try {
        let projectQuery = Project.findById(req.params.projectId);
        if (superuserState.view) {
            projectQuery = projectQuery.populate('user', 'email');
        }
        const project = await projectQuery;
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting project', error });
    }
};
export const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.findByIdAndUpdate(req.params.projectId, { name, description }, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};
