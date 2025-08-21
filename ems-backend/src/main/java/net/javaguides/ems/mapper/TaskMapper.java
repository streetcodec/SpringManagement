package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.TaskDto;
import net.javaguides.ems.entity.Task;

import java.util.stream.Collectors;

public class TaskMapper {
    public static TaskDto mapToTaskDto(Task task) {
        return new TaskDto(
            task.getId(),
            task.getTaskName(),
            task.getTaskDescription(),
            task.getAssignedEmployees().stream().map(EmployeeMapper::mapToEmployeeDto).collect(Collectors.toList())
        );
    }
}