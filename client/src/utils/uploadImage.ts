export const uploadFile = async (file: File, token: string): Promise<string> => {
  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch('http://localhost:5000/api/v1/images/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to upload image');
  }

  const json = await res.json();
  if (json.success && json.data && json.data.length > 0) {
    return json.data[0].file_url;
  }
  throw new Error('Invalid upload response');
};
