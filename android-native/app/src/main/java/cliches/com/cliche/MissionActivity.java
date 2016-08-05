package cliches.com.cliche;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MissionActivity extends AppCompatActivity {

    public static final String MISSION_KEY = "mission_key";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mission);
    }
}
