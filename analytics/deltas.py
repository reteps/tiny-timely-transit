import pandas as pd
import glob
import json
import geopandas as gpd
import shapely
import seaborn as sns
from typing import Dict
from collections import defaultdict
import tqdm
import pydantic

class KNNModel(pydantic.BaseModel):
    mean_latency: float
    max_latency: float
    deltas: dict

def accumulate_diffs(diffs, timeseries: pd.DataFrame) -> Dict:
    """
    Accumulates/calculates the diffs between stops, generated by the given timeseries data
    """
    current_stop = None
    start_time = None

    for _, row in timeseries.iterrows():
        if row["next_stop_id"] != current_stop:
            if start_time and current_stop:
                if current_stop not in diffs:
                    diffs[current_stop] = {}
                if row["next_stop_id"] not in diffs[current_stop]:
                    diffs[current_stop][row["next_stop_id"]] = []
                diffs[current_stop][row["next_stop_id"]].append((start_time, row["captured_at_t"] - start_time))
                
            current_stop = row["next_stop_id"]
            start_time = row["captured_at_t"]
    return diffs

def generate_deltas(responses: pd.DataFrame) -> KNNModel:
    time_cols = ["last_updated", "captured_at"]
    for col in time_cols:
        responses[f"{col}_t"] = pd.to_datetime(responses[col])

    latency = responses["captured_at_t"] - responses["last_updated_t"]
    # points = responses["location"].apply(lambda x: eval(x)).apply(lambda x: shapely.geometry.Point(x["lat"], x["lon"]))

    # responses["geometry"] = gpd.GeoSeries(points)
    responses_sorted = responses.sort_values("captured_at")

    trip_uids = set(responses_sorted["trip_id"])

    trip_diffs = {}

    for trip_id in tqdm.tqdm(trip_uids):
        trip_diffs = accumulate_diffs(trip_diffs, responses_sorted[responses_sorted["trip_id"] == trip_id])

    return KNNModel(
        mean_latency=latency.mean(),
        max_latency=latency.max(),
        deltas = trip_diffs
    )




