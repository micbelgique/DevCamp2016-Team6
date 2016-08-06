package cliches.com.cliche.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.google.gson.Gson;

import java.io.ByteArrayOutputStream;
import java.io.File;

/**
 * Convert the image to Base64.
 */
public class SendPictureRequest {

    public SendPictureRequest(File pictureFile) {
        Bitmap bm = BitmapFactory.decodeFile(pictureFile.getAbsolutePath());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bm.compress(Bitmap.CompressFormat.JPEG, 100, baos);

        picture = Base64.encodeToString(baos.toByteArray(), Base64.DEFAULT);
    }

    /** A String containing the image encoded in Base64 */
    public String picture;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
