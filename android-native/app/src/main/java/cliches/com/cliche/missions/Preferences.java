package cliches.com.cliche.missions;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.annotation.NonNull;

import java.util.UUID;

public class Preferences {
    private final static String PREFS_FILENAME = "clichesPrefs";

    private static Preferences sInstance;

    private final SharedPreferences mPrefs;

    public static Preferences init(@NonNull Context appContext) {
        sInstance = new Preferences(appContext);
        return sInstance;
    }

    private Preferences(Context appContext) {
        mPrefs = appContext.getSharedPreferences(PREFS_FILENAME, Context.MODE_PRIVATE);
    }

    public static Preferences get() {
        return sInstance;
    }

    public void setDeviceId(UUID uuid) {
        SharedPreferences.Editor editor = mPrefs.edit();
        editor.putString("device_uuid", uuid.toString());
        editor.commit();
    }

    public String getDeviceId() {
        return mPrefs.getString("device_uuid", null);
    }

    public void initializeUUIDIfNecessary() {
        if(getDeviceId() == null) {
            setDeviceId(UUID.randomUUID());
        }
    }
}
