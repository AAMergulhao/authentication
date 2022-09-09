import { Response } from "express";

import CustomRequest from "../utils/CustomRequest";

import RoleService from "../services/RoleService";
class RoleController {
  public roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  public create = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { name } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Name cannot be null or empty." });
      }

      const role = await this.roleService.create(name);
      return res.json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

  };

  public fetch = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const roles = await this.roleService.fetch();
      return res.json(roles);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  public delete = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id || id.trim() === "") {
        return res.status(400).json({ message: "Role id cannot be null." });
      }

      const successfullyDeleted = await this.roleService.delete(parseInt(id));
      if (!successfullyDeleted) {
        return res.status(500).json({ message: 'Error while deleting role.' });
      }

      return res.json({ message: 'Role sucessfully deleted.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  public get = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id || id.trim() === "") {
        return res.status(400).json({ message: "Role id cannot be null." });
      }
      const role = await this.roleService.get(parseInt(id));

      if (!role) {
        return res.status(404).json({ message: "Role not found." });
      }
      return res.json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default RoleController;