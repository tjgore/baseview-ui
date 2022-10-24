import { useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { profiles as profileApi } from '@/utils/api';
import { isProfile, FormattedProfileType, ProfileFormType } from '@/types/profiles';
import Message from '@/components/Toast/Message';

const formatProfile = (profileData: unknown): FormattedProfileType | null => {
  if (!isProfile(profileData)) {
    return null;
  }

  const { id, email, first_name, last_name, profile, roles } = profileData;
  const { id: profile_id, general } = profile;
  const { preferred_name, gender, dob, mobile, address } = general;

  return {
    id: profile_id,
    user_id: id,
    fullName: `${first_name} ${last_name}`,
    first_name,
    last_name,
    email,
    preferred_name,
    gender,
    dob,
    mobile,
    address,
    roles,
  };
};

const useProfile = (enabled = true) => {
  const profileQuery = useQuery(['profile'], profileApi.get, { enabled });
  const { data } = profileQuery;

  const profileDefaultValues = useMemo(() => {
    const formattedProfile = formatProfile(data);
    return formattedProfile
      ? {
          first_name: formattedProfile.first_name,
          last_name: formattedProfile.last_name,
          email: formattedProfile.email,
          preferred_name: formattedProfile.preferred_name,
          gender: formattedProfile.gender,
          dob: formattedProfile.dob,
          mobile: formattedProfile.mobile,
          address: formattedProfile.address,
        }
      : {};
  }, [data]);

  const editProfile = useMutation(
    (data: ProfileFormType) => {
      return profileApi.edit(data);
    },
    {
      onSuccess: () => {
        toast.success(
          <Message
            title="Success"
            body="Profile has been updated."
          />,
        );
        profileQuery.refetch();
      },
      onError: () => {
        toast.error(
          <Message
            title="Error"
            body="An error occurred. Try again."
          />,
        );
      },
    },
  );

  return {
    profile: formatProfile(data),
    profileQuery,
    profileDefaultValues,
    editProfile,
  };
};

export default useProfile;
