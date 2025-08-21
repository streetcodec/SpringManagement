package net.javaguides.ems.dto;

import java.time.LocalDate;
import java.util.List;

public class AttendanceDto {
    private long id;
    private LocalDate date;
    private List<EmployeeDto> presentEmployees;

    public AttendanceDto() {
    }

    public AttendanceDto(long id, LocalDate date, List<EmployeeDto> presentEmployees) {
        this.id = id;
        this.date = date;
        this.presentEmployees = presentEmployees;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<EmployeeDto> getPresentEmployees() {
        return presentEmployees;
    }

    public void setPresentEmployees(List<EmployeeDto> presentEmployees) {
        this.presentEmployees = presentEmployees;
    }
}