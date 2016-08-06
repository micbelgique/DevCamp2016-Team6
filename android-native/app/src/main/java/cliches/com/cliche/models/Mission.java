package cliches.com.cliche.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Mission implements Serializable{

    public String name;
    public String tagline;

    @SerializedName("id")
    public int serverId;

    @SerializedName("picture")
    public String pictureURL;
}
