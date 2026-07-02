import { requestSosModel } from "../models/requestSos.js";
import { sosModel } from "../models/sos.js";
import { userModel } from "../models/user.js";
import { confirmHelperRelationship } from "./sos.js";

export async function handleRequestSos(data) {
  const { helperId, userId, relation } = data;
  try {
    let requestTakenUser = await requestSosModel.findOne({
      requestedTo: helperId,
    });
    if (!requestTakenUser) {
      requestTakenUser = await requestSosModel.create({
        requestedTo: helperId,
        requestedFrom: [
          {
            requesters: userId,
            relation: relation,
          },
        ],
      });
    } else {
      let alreadyExists = await requestTakenUser.requestedFrom.some(
        (item) => item.requesters.toString() === userId,
      );
      if (!alreadyExists) {
        requestTakenUser.requestedFrom.push({
          requesters: userId,
          relation: relation,
        });
        requestTakenUser.save();
      } else {
        throw new error("You Cannot Request Same User multiple Time");
      }
    }
  } catch (error) {
    throw new error("Cannot SetRequest here");
  }
}

export async function updateRequestStatus(req, res) {
  const { userId, requesters, status } = req.body;
  if (!status) {
    console.log("Cannot go forward because request is denied");
    return;
  }
  try {
    await handleUserSideSos(req.body);
    await confirmHelperRelationship(req.body);
    const requester = await requestSosModel.findOneAndUpdate(
      {
        requestedTo: userId,
        "requestedFrom.requesters": requesters,
      },
      {
        $set: {
          "requestedFrom.$.status": status,
        },
      },

      { returnDocument: "after" },
    );
    if (!requester) {
      return res.status(404).json({ messsage: "Requester not found" });
    }
    return res.status(200).json({ data: "updated sucessfully" });
  } catch (error) {
    return res
      .status(404)
      .json({ data: "cannot updated", ErMsg: error.message });
  }
}

export async function handleUserSideSos(data) {
  const { userId, requesters, status } = data;

  try {
    let userExist = await sosModel.findOne({ userInfo: requesters });
    if (userExist) {
      userExist = await sosModel.findOneAndUpdate(
        { userInfo: requesters, "helperInfo.helper": userId },
        { $set: { "helperInfo.$.status": status } },
        { returnDocument: "after" },
      );
    } else {
      throw new error("Sorry You havent send request yet");
    }
  } catch (error) {
    throw new error("Sorry You Not Here in Helper list");
  }
}

export async function SendImmediateAlert(req, res) {
  const { userId } = req.body;
  try {
    return res.status(201).json({ msg: "alert send sucessfully" });
  } catch (error) {
    return res.status(404).json({ msg: "Cannot send the alert msg" });
  }
}

export async function requestReceive(req, res) {
  const { userId } = req.body;
  const requestedTo = userId;
  try {
    const request = await requestSosModel
      .findOne({
        requestedTo: requestedTo,
      })
      .populate("requestedFrom.requesters");
    return res.status(201).json({ data: request });
  } catch (error) {
    return res.status(404).json({ msg: "Cannot send the request" });
  }
}

export async function sosHelperAvailable(req, res) {
  const { userId } = req.body;
  try {
    const sos = await sosModel.findOne({ userInfo: userId });

    const helperIds = sos?.helperInfo.map((item) => item.helper) || [];
    helperIds.push(userId);
    const users = await userModel.find({
      _id: { $nin: helperIds },
    });
    return res.status(201).json({ data: users });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "No Any Helper Is Available" });
  }
}
