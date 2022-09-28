import { useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getDefaultValues } from '@/utils/helpers';
import { isSchoolData, SchoolType } from '@/types/schools';
import { schools as schoolsApi } from '@/utils/api';

type UseSchoolType = {
  schoolId?: string | string[];
};

const useSchool = ({ schoolId }: UseSchoolType) => {
  const schoolQuery = useQuery(['school', schoolId], () => schoolsApi.findById(schoolId), { enabled: !!schoolId });
  const { data } = schoolQuery;

  const school: SchoolType | null = isSchoolData(data) ? data : null;
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
