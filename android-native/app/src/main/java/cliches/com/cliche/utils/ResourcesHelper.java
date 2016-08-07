package cliches.com.cliche.utils;

import android.content.Context;
import android.content.res.Resources;
import android.support.annotation.ColorRes;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.util.TypedValue;

import timber.log.Timber;

/**
 * Created by fstephany on 07/08/16.
 */

public class ResourcesHelper {
    private static ResourcesHelper sInstance;
    private Context mContext;
    private Resources mResources;
    private String mPackageName;

    protected static void init(@NonNull Context context) {
        sInstance = new ResourcesHelper(context);
    }

    private ResourcesHelper(Context context) {
        mContext = context;
        mResources = context.getResources();
        mPackageName = context.getPackageName();
    }

    public static ResourcesHelper get() {
        return sInstance;
    }

    /**
     * Lets you get a String Resource from its name instead of its generated ID (in R).
     * @param resourceName the name of the resource we want to fetch.
     * @return the String of the string files matching the resourceName.
     */
    public String getString(String resourceName) {
        int stringIdentifier = mResources.getIdentifier(resourceName, "string", mPackageName);

        if(stringIdentifier == 0) {
            Timber.w("Could not find String with name: " + resourceName);
            return  resourceName;
        }

        return mResources.getString(stringIdentifier);
    }

    public String getString(int stringIdentifier) {
        return mResources.getString(stringIdentifier);
    }

    public int getIdForDrawable(String drawableName) {
        return mResources.getIdentifier(drawableName, "drawable", mPackageName);
    }

    public int dpToPx(int dpToConvert) {
        return (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                dpToConvert,
                mResources.getDisplayMetrics());
    }

    public int getColor(@ColorRes int colorResourceId) {
        return ContextCompat.getColor(mContext, colorResourceId);
    }
}
