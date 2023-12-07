package io.cproject.backend.model.enums;

public enum StatusName {
    IN_PROCESSING(1),
    IN_WORK(2),
    DONE(3);

    private final int id;

    StatusName(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
