import { useEffect, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getDefaultValues } from '@/utils/helpers';
import { isSchoolData, SchoolType } from '@/types/schools';
import { schools as schoolsApi } from '@/utils/api';
import Message from '@/components/Toast/Message';

type UseSchoolType = {
  schoolId: number;
};

const useSchool = ({ schoolId }: UseSchoolType) => {
  const schoolQuery = useQuery(['school', schoolId], () => schoolsApi.findById(schoolId), { enabled: !!schoolId });
  const { data } = schoolQuery;

  const school = isSchoolData(data) ? data : null;
  const schoolDefaultValues = useMemo(() => (isSchoolData(data) ? getDefaultValues(data) : {}), [data]);

  const createSchool = useMutation((data: SchoolType) => {
    return schoolsApi.create(data);
  });

  const editSchool = useMutation((data: SchoolType) => {
    return schoolsApi.edit(schoolId, data);
  });

  const deleteSchool = useMutation(() => {
    return schoolsApi.delete(schoolId);
  });

  useEffect(() => {
    if (deleteSchool.isSuccess) {
      toast.error(
        <Message
          title="Deletion"
          body="School has been deleted."
        />,
      );
    }
    if (deleteSchool.isError) {
      toast.error(
        <Message
          title="Error"
          body="Ooops, looks like something went wrong. Try again"
        />,
      );
    }
  }, [deleteSchool.isSuccess, deleteSchool.isError]);

  return {
    schoolQuery,
    school,
    schoolDefaultValues,
    createSchool,
    editSchool,
    deleteSchool,
  };
};

export default useSchool;
