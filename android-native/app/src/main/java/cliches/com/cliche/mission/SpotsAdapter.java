package cliches.com.cliche.mission;

import android.content.Context;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;

import cliches.com.cliche.R;
import cliches.com.cliche.models.Spot;

public class SpotsAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private static final int REGULAR_CELL = 0;
    private static final int HEADER_CELL = 1;

    Context mContext;
    MissionPresenter mPresenter;

    public SpotsAdapter(Context context, MissionPresenter presenter) {
        mContext = context;
        mPresenter = presenter;
    }

    @Override
    public int getItemCount() {
        return mPresenter.spotsCount();
    }

    @Override
    public int getItemViewType(int position) {
        return position == 0 ? HEADER_CELL : REGULAR_CELL;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        if(viewType == HEADER_CELL) {
            View itemView = LayoutInflater
                    .from(parent.getContext())
                    .inflate(R.layout.line_item_description, parent, false);

            return new MissionDescriptionViewHolder(itemView);
        }

        // Regular Cell

        View itemView = LayoutInflater
                .from(parent.getContext())
                .inflate(R.layout.line_item_spot, parent, false);

        return new SpotViewHolder(mPresenter, itemView);
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if(getItemViewType(position) == HEADER_CELL) {
            bindHeaderCell((MissionDescriptionViewHolder)holder);
        } else {
            bindRegularCell((SpotViewHolder)holder, position);
        }
    }

    private void bindHeaderCell(MissionDescriptionViewHolder holder) {
        holder.description.setText(mPresenter.getMission().description);
    }

    private void bindRegularCell(SpotViewHolder holder, int position) {
        Spot currentSpot = mPresenter.getSpot(position);
        String urlToLoad = currentSpot.isOwned() ? currentSpot.ownPictureURL : currentSpot.pictureURL;

        holder.name.setText(currentSpot.name);
        holder.ownCheck.setVisibility(currentSpot.isOwned() ? View.VISIBLE : View.GONE);

        Glide.with(mContext)
                .load(urlToLoad)
                .fitCenter()
                .into(holder.image);
    }

    public GridLayoutManager.SpanSizeLookup getSpanLookup() {
        // Only the header needs to be spanned acrosse two columns
        return new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                return position == 0 ? 2 : 1;
            }
        };
    }

    // View Holders

    static class MissionDescriptionViewHolder extends RecyclerView.ViewHolder {
        TextView description;

        public MissionDescriptionViewHolder(View viewToHold) {
            super(viewToHold);
            description = (TextView) viewToHold.findViewById(R.id.description);
        }
    }

    static class SpotViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        MissionPresenter mPresenter;
        TextView name;
        ImageView image;
        ImageView ownCheck;

        public SpotViewHolder(MissionPresenter presenter, View viewToHold) {
            super(viewToHold);
            name = (TextView) viewToHold.findViewById(R.id.name);
            image = (ImageView) viewToHold.findViewById(R.id.image);
            ownCheck = (ImageView) viewToHold.findViewById(R.id.owned);

            mPresenter = presenter;
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            mPresenter.openSpot(getAdapterPosition());
        }
    }
}
