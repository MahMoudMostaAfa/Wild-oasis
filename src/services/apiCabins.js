import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    // console.error(error);
    throw new Error("An error occurred while fetching cabins");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // to avoid the error of the image name
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  //https://iaiadlibxklcwhnjeabg.supabase.co/storage/v1/object/public/cabins-imgs/cabin-001.jpg?t=2024-06-10T19%3A24%3A34.388Z

  // check if the image is already uploaded
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagepath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-imgs/${imageName}`;

  let query = supabase.from("cabins");

  // 1- craating a new cabin
  // select().single() is used to return the data of the new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  // singel() is used to return the data one of the updated cabin
  const { data, error } = await query.select().single();

  if (error) {
    // console.error(error);
    throw new Error(
      `${
        id
          ? "An error occurred while updating cabins "
          : "An error occurred while creating cabins"
      }`
    );
  }
  // 2- uploading the image
  if (hasImagepath) return data;
  const { error: imageError } = await supabase.storage
    .from("cabins-imgs")
    .upload(imageName, newCabin.image);

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("error with uploading the image");
  }
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    // console.error(error);
    throw new Error("An error occurred while fetching cabins");
  }
}
