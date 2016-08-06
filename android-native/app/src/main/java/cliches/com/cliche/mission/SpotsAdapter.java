package cliches.com.cliche.mission;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;

import cliches.com.cliche.R;
import cliches.com.cliche.models.Spot;

public class SpotsAdapter extends RecyclerView.Adapter<SpotsAdapter.SpotViewHolder> {

    Context mContext;
    MissionPresenter mPresenter;

    public SpotsAdapter(Context context, MissionPresenter presenter) {
        mContext = context;
        mPresenter = presenter;
    }

    @Override
    public SpotViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater
                .from(parent.getContext())
                .inflate(R.layout.line_item_mission, parent, false);

        return new SpotViewHolder(mPresenter, itemView);
    }

    @Override
    public void onBindViewHolder(SpotViewHolder holder, int position) {
        Spot currentSpot = mPresenter.getSpot(position);
        holder.name.setText(currentSpot.name);

        Glide.with(mContext)
                .load(currentSpot.pictureURL)
                .fitCenter()
                .into(holder.image);
    }

    @Override
    public int getItemCount() {
        return mPresenter.spotsCount();
    }

    static class SpotViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        MissionPresenter mPresenter;
        TextView name;
        ImageView image;

        public SpotViewHolder(MissionPresenter presenter, View viewToHold) {
            super(viewToHold);
            name = (TextView) viewToHold.findViewById(R.id.name);
            image = (ImageView) viewToHold.findViewById(R.id.image);

            mPresenter = presenter;
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            mPresenter.openSpot(getAdapterPosition());
        }
    }
}
