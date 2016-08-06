package cliches.com.cliche.models;


import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Spot implements Serializable {
    @SerializedName("id")
    public int serverId;

    @SerializedName("picture")
    public String pictureURL;

    @SerializedName("own_picture")
    public String ownPictureURL;

    public String name;
    public String description;
    public double latitude;
    public double longitude;
    public boolean geolocalized;
    public int missionServerId;

    public boolean isOwned() {
        return ownPictureURL != null;
    }

    public LatLng getCoordinates() {
        return new LatLng(latitude, longitude);
    }
}
