import { Link, Member, PrismaClient, Profile } from "@prisma/client";
import express from "express";
import { tokenVerify } from "../middleware/token";
import { ResponseObject } from "../utils/response";
const router = express.Router();

const prisma = new PrismaClient();

/**
 * _GET Member Link, for updates ect
 * Route: /api/v1/member
 */
router.get("/", tokenVerify, async (req, res) => {
  // Check if this user valid and also get their member record
  type UserWithMemberAndLinks = Profile & {
    member:
      | (Member & {
          links: Link[];
        })
      | null;
  };
  const user: UserWithMemberAndLinks | null = await prisma.profile.findFirst({
    where: {
      id: req.profile.id,
    },
    include: {
      member: {
        include: {
          links: true,
        },
      },
    },
  });

  if (!user) {
    return new ResponseObject(res, false, 404, "Authorization problem!");
  }

  // User have member record
  if (user.member) {
    return new ResponseObject(res, true, 200, "Success");
  }

  // User Don't have Member Record. Let's create new one
  const newMemberRecord: Member = await prisma.member.create({
    data: {
      username: user.username,
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      profile: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return new ResponseObject(res, true, 200, "Success", {
    ...newMemberRecord,
    links: [],
  });
});

/**
 * _GET Member Link For Showing ( Don't need to login )
 * Route: /api/v1/member/show/:username
 */
router.get("/show/:username", async (req, res) => {
  const username: string = req.params.username;
  type MemberWithLink =
    | (Member & {
        links: Link[];
      })
    | null;
  const member: MemberWithLink = await prisma.member.findFirst({
    where: {
      username,
    },
    include: {
      links: true,
    },
  });

  if (member) {
    return new ResponseObject(res, true, 200, "success", {
      member: { ...member, profileId: null },
    });
  } else {
    return new ResponseObject(res, false, 404, "User not found");
  }
});

// SECTION LINK

/**
 * _POST Add Link to Member
 * @body string linkName - new link's name
 * @body string link - the link itselft
 * Route: /api/v1/member/:username
 */
router.post("/", tokenVerify, async (req, res) => {
  const linkName = req.body.linkName;
  const link = req.body.link;

  const updatedMember: Member = await prisma.member.update({
    where: {
      profileId: req.profile.id,
    },
    data: {
      links: {
        create: {
          name: linkName,
          link,
        },
      },
    },
    include: {
      links: true,
    },
  });

  return new ResponseObject(res, true, 200, "success", { updatedMember });
});

/**
 * _PUT Update Link Detail
 * @body string linkName
 * @body string link
 * Route: /api/v1/member/link/:linkId
 */
router.put("/link/:linkId", tokenVerify, async (req, res) => {
  const linkId = req.params.linkId;
  const linkName = req.body.linkName;
  const link = req.body.link;

  // Check if this link owned by this user
  const member = await prisma.member.findFirst({
    where: {
      profileId: req.profile.id,
      links: {
        some: {
          id: linkId,
        },
      },
    },
  });

  if (!member) {
    return new ResponseObject(res, false, 400, "You can't edit other's link");
  }

  const updatedLink: Link = await prisma.link.update({
    where: {
      id: linkId,
    },
    data: {
      link,
      name: linkName,
    },
  });

  return new ResponseObject(res, true, 200, "Updated", { updatedLink });
});

/**
 * _DEL Remove link from Member
 * Route /api/v1/member/link/:linkId
 */
router.delete("/link/:linkId", tokenVerify, async (req, res) => {
  const linkId = req.params.linkId;

  // Check if this link owned by this user
  const member = await prisma.member.findFirst({
    where: {
      profileId: req.profile.id,
      links: {
        some: {
          id: linkId,
        },
      },
    },
  });

  if (!member) {
    return new ResponseObject(res, false, 400, "You can't delete other's link");
  }

  try {
    await prisma.link.delete({
      where: {
        id: linkId,
      },
    });
    return new ResponseObject(res, true, 200, "Success");
  } catch (error) {
    console.log(error);
    return new ResponseObject(res, false, 400, "Not deleted");
  }
});

// !SECTION

export { router as memberRouter };
