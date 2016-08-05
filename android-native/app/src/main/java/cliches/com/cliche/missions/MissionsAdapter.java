package cliches.com.cliche.missions;

import android.content.DialogInterface;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import cliches.com.cliche.R;

public class MissionsAdapter extends RecyclerView.Adapter<MissionsAdapter.MissionViewHolder> {

    MissionsPresenter mPresenter;

    public MissionsAdapter(MissionsPresenter presenter) {
        mPresenter = presenter;
    }

    @Override
    public MissionViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View itemView = LayoutInflater
                .from(viewGroup.getContext())
                .inflate(R.layout.line_item_mission, viewGroup, false);

        return new MissionViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MissionViewHolder holder, int position) {
        Mission currentMistion = mPresenter.getMissions(position);


    }


    @Override
    public int getItemCount() {
        return 0;
    }

    // View Holder

    static class MissionViewHolder extends RecyclerView.ViewHolder implements DialogInterface.OnClickListener {
        private final TextView name;
        private final TextView tagLine;
        private final ImageView image;

        public MissionViewHolder(View itemView) {
            super(itemView);
            name = (TextView) itemView.findViewById(R.id.name);
            tagLine = (TextView) itemView.findViewById(R.id.tagline);
            image = (ImageView) itemView.findViewById(R.id.image);
        }

        @Override
        public void onClick(DialogInterface dialogInterface, int i) {

        }
    }
}


