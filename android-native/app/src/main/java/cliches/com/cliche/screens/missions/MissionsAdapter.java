package cliches.com.cliche.screens.missions;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;

import cliches.com.cliche.R;
import cliches.com.cliche.models.Mission;

public class MissionsAdapter extends RecyclerView.Adapter<MissionsAdapter.MissionViewHolder> {

    Context mContext;
    MissionsListPresenter mPresenter;

    public MissionsAdapter(Context context, MissionsListPresenter presenter) {
        mContext = context;
        mPresenter = presenter;
    }

    @Override
    public MissionViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View itemView = LayoutInflater
                .from(viewGroup.getContext())
                .inflate(R.layout.line_item_mission, viewGroup, false);

        return new MissionViewHolder(mPresenter, itemView);
    }

    @Override
    public void onBindViewHolder(MissionViewHolder holder, int position) {
        Mission currentMission = mPresenter.getMission(position);
        holder.name.setText(currentMission.name);
        holder.tagLine.setText(currentMission.tagline);

        Glide.with(mContext)
                .load(currentMission.pictureURL)
                .fitCenter()
                .into(holder.image);
    }


    @Override
    public int getItemCount() {
        return mPresenter.missionCount();
    }

    // View Holder

    static class MissionViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private final MissionsListPresenter mPresenter;

        private final TextView name;
        private final TextView tagLine;
        private final ImageView image;

        public MissionViewHolder(MissionsListPresenter presenter, View itemView) {
            super(itemView);
            mPresenter = presenter;
            name = (TextView) itemView.findViewById(R.id.name);
            tagLine = (TextView) itemView.findViewById(R.id.tagline);
            image = (ImageView) itemView.findViewById(R.id.image);

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            mPresenter.openMission(getAdapterPosition());
        }
    }
}


