import React from "react";
import axios from "axios";
import "./History.css";
import PredictionCard from "../../components/PredictionCard";
import Navbar from "../../components/Navbar";
import { Toaster, toast } from "sonner";
import { Modal } from "bootstrap";

class History extends React.Component {
  state = {
    predicts: [],
    filteredPredicts: [],
    selectedMachineType: "All",
    selectedFailureType: "All",
    loading: true,
    selectedDeleteId: null,
  };
  componentDidMount() {
    this.getPredicts();
  }

  getPredicts() {
    axios
      .get("https://predictive-maintenance-01qp.onrender.com/predictapi/")
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        this.setState({
          predicts: sortedData,
          filteredPredicts: sortedData,
          loading: false,
        });
      })
      .catch((error) => {
        toast.error("Error fetching data");
        this.setState({ loading: false });
      });
  }

  handleFilterChange = () => {
    const { predicts, selectedMachineType, selectedFailureType } = this.state;
    const filtered = predicts.filter((p) => {
      const machineMatch =
        selectedMachineType === "All" || p.mach_type === selectedMachineType;
      const failureMatch =
        selectedFailureType === "All" || p.failure_type === selectedFailureType;
      return machineMatch && failureMatch;
    });

    this.setState({ filteredPredicts: filtered });
  };

  handleMachineTypeChange = (event) => {
    this.setState(
      { selectedMachineType: event.target.value },
      this.handleFilterChange
    );
  };

  handleFailureTypeChange = (event) => {
    this.setState(
      { selectedFailureType: event.target.value },
      this.handleFilterChange
    );
  };

  handleDelete = (id) => {
    axios
      .delete(`https://predictive-maintenance-01qp.onrender.com/predictapi/${id}/`)
      .then(() => {
        toast.success("Prediction deleted successfully");
        const updatedPredicts = this.state.predicts.filter((p) => p.id !== id);
        this.setState(
          {
            predicts: updatedPredicts,
          },
          this.handleFilterChange
        );
      })
      .catch((error) => {
        toast.error("Error deleting prediction");
      });
  };

  showDeleteModal = (id) => {
    this.setState({ selectedDeleteId: id }, () => {
      const modal = new Modal(document.getElementById("deleteModal"));
      modal.show();
    });
  };

  confirmDelete = () => {
    const { selectedDeleteId } = this.state;
    if (selectedDeleteId) {
      this.handleDelete(selectedDeleteId);
    }

    const modalEl = document.getElementById("deleteModal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  };

  render() {
    return (
      <>
        <Navbar />

        <h1>Prediction History</h1>
        <br />

        <div className="filters">
          <select
            value={this.state.selectedMachineType}
            onChange={this.handleMachineTypeChange}
            className="dropdown"
          >
            <option value="All">All Machine Types</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <select
            value={this.state.selectedFailureType}
            onChange={this.handleFailureTypeChange}
            className="dropdown"
          >
            <option value="All">All Failure Types</option>
            <option value="No Failure">No Failure</option>
            <option value="Heat Dissipation Failure">
              Heat Dissipation Failure
            </option>
            <option value="Power Failure">Power Failure</option>
            <option value="Tool Wear Failure">Tool Wear Failure</option>
            <option value="Overstrain Failure">Overstrain Failure</option>
            <option value="Random Failure">Random Failure</option>
          </select>
        </div>

        <div className="history-container">
          <div className="prediction-heading">
            <div>
              <strong>Failure Risk Status</strong>
            </div>
            <div>
              <strong>Machine Type</strong>
            </div>
            <div>
              <strong>Process Temp</strong>
            </div>
            <div>
              <strong>Air Temp</strong>
            </div>
            <div>
              <strong>Rotational Speed</strong>
            </div>
            <div>
              <strong>Torque</strong>
            </div>
            <div>
              <strong>Tool Wear</strong>
            </div>
            <div>
              <strong>Failure Type</strong>
            </div>
            <div>
              <strong>Created At</strong>
            </div>
          </div>
          {this.state.filteredPredicts.map((predict, index) => (
            // <PredictionCard key={index} predict={predict} />
            <PredictionCard
              key={index}
              predict={predict}
              // onDelete={this.handleDelete}
              onDeleteClick={() => this.showDeleteModal(predict.id)}
            />
          ))}
        </div>

        <Toaster richColors position="bottom-right" />

        <div
          className="modal custom-modal"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this prediction?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default History;
