import { userInfo } from "os";
import { sosModel } from "../models/sos.js";
import { userModel } from "../models/user.js";
import { handleRequestSos } from "./requestedSos.js";
import { requestSosModel } from "../models/requestSos.js";

export async function sosSet(req, res) {
  const { userId, helperId, relation } = req.body;
  try {
    await handleRequestSos(req.body);
    const helper = await userModel.findById(helperId);
    if (!helper) {
      return res.status(404).json({
        message: "Sorry this user is not available to add as a helper",
      });
    }

    let existingUserSos = await sosModel.findOne({ userInfo: userId });
    if (!existingUserSos) {
      existingUserSos = await sosModel.create({
        userInfo: userId,
        helperInfo: [
          {
            helper: helperId,
            relation: relation,
          },
        ],
      });
    } else {
      const alreadyExists = existingUserSos.helperInfo.some(
        (item) => item.helper.toString() === helperId,
      );
      if (!alreadyExists) {
        existingUserSos.helperInfo.push({
          helper: helperId,
          relation: relation,
        });
        await existingUserSos.save();
      } else {
        return res.status(400).json({
          message: "Sorry this helper is already added",
        });
      }
    }

    return res.status(200).json({
      message: "Helper added successfully",
      data: existingUserSos,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ data: "Something went wrong" });
  }
}

export async function findSosUser(req, res) {
  const { userId } = req.body;
  try {
    const helpers = await sosModel.findOne({ userInfo: userId });
    if (!helpers) {
      return res.status(401).json({ message: "You Havent add any helper yet" });
    }

    const userDetail = await sosModel
      .findOne({ userInfo: userId })
      .populate("userInfo")
      .populate("helperInfo.helper");
    return res.status(201).json({ data: userDetail });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "not getting relative,try again" });
  }
}

export async function removeHelper(req, res) {
  const { userId, helperId, requestedTo } = req.body;
  try {
    await sosModel.updateOne(
      { userInfo: userId },
      {
        $pull: {
          helperInfo: {
            _id: helperId,
          },
        },
      },
    );
    await requestSosModel.updateOne(
      { requestedTo: requestedTo },
      {
        $pull: {
          requestedFrom: {
            requesters: userId,
          },
        },
      },
    );
    return res.status(201).json({ msg: "Delete Helper sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Cannot send the alert msg" });
  }
}

export async function confirmHelperRelationship(data) {
  let { userId, requesters, status, relation } = data;
  const helperId = requesters;
  try {
    const helper = await userModel.findById(helperId);
    if (!helper) {
      return;
    }

    let existingUserSos = await sosModel.findOne({ userInfo: userId });
    if (!existingUserSos) {
      existingUserSos = await sosModel.create({
        userInfo: userId,
        helperInfo: [
          {
            helper: helperId,
            relation: relation,
            status: status,
          },
        ],
      });
    } else {
      const alreadyExists = existingUserSos.helperInfo.some(
        (item) => item.helper.toString() === helperId,
      );
      if (!alreadyExists) {
        existingUserSos.helperInfo.push({
          helper: helperId,
          relation: relation,
        });
        await existingUserSos.save();
      } else {
        return;
      }
    }

    return;
  } catch (error) {
    console.log(error.message);
    return;
  }
}
