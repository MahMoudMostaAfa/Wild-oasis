import supabase, { supabase2, supabaseUrl } from "./supabase";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  //console.log(data);
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // if there is a session, we will get the user data
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase2.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //1 update paswword or full name
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // 2 upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarError) throw new Error(avatarError.message);

  // 3 update avatar in user

  const { data: avatarData, error: avatarDataError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarDataError) throw new Error(avatarDataError.message);
  return avatarData;
}
