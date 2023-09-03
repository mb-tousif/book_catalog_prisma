import { User } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";

// Get: Profile - get user profile by header token for specific user(admin, customer)
const getProfile = async (
  token: string
): Promise<Partial<User | undefined>> => {
  const decodedToken = await jwtHelpers.verifyToken(
    token,
    process.env.JWT_SECRET as string
  );
  if (decodedToken?.role === 'admin' || decodedToken?.role === 'customer') {
    const result = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
      },
    });
    return result as any;
  }
};

export const ProfileService = {
    getProfile,
};
