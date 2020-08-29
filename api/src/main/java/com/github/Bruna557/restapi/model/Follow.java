package com.github.Bruna557.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "followings")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Follow {
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "follower_id", insertable = false, updatable = false)
    private User follower;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "followed_id", insertable = false, updatable = false)
    private User followed;

    @Id
    @Column(name = "follower_id")
    private long followerId;

    @Column(name = "followed_id")
    private long followedId;

    public Follow(long followerId, long followedId) {
        this.followerId = followerId;
        this.followedId = followedId;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowed() {
        return followed;
    }

    public void setFollowed(User followed) {
        this.followed = followed;
    }

    public long getFollowerId() {
        return followerId;
    }

    public void setFollowerId(long followerId) {
        this.followerId = followerId;
    }

    public long getFollowedId() {
        return followedId;
    }

    public void setFollowedId(long followedId) {
        this.followedId = followedId;
    }
}
